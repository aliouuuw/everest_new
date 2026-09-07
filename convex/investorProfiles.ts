import { v } from "convex/values";
import { mutation, query, internalAction, internalQuery, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// Mutation to create a new investor profile lead
export const createLead = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    profileType: v.union(
      v.literal("conservative"),
      v.literal("moderate"),
      v.literal("balanced"),
      v.literal("growth"),
      v.literal("aggressive")
    ),
    profileTitle: v.string(),
    riskLevel: v.number(),
    answers: v.array(v.object({
      questionId: v.string(),
      value: v.number(),
    })),
    investmentAmount: v.optional(v.number()),
    source: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  returns: v.id("investorProfileLeads"),
  handler: async (ctx, args) => {
    const now = Date.now();

    const leadId = await ctx.db.insert("investorProfileLeads", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      profileType: args.profileType,
      profileTitle: args.profileTitle,
      riskLevel: args.riskLevel,
      answers: args.answers,
      investmentAmount: args.investmentAmount,
      emailSent: false,
      pdfGenerated: false,
      source: args.source ?? "website",
      userAgent: args.userAgent,
      createdAt: now,
      updatedAt: now,
    });

    // Schedule email sending action
    await ctx.scheduler.runAfter(0, internal.investorProfiles.sendProfileEmail, {
      leadId,
    });

    return leadId;
  },
});

// Action to send profile email via Resend
export const sendProfileEmail = internalAction({
  args: {
    leadId: v.id("investorProfileLeads"),
  },
  returns: v.object({
    success: v.boolean(),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return { success: false, error: "Email service not configured" };
    }

    // Fetch lead data
    const lead = await ctx.runQuery(internal.investorProfiles.getLeadById, {
      leadId: args.leadId,
    });

    if (!lead) {
      return { success: false, error: "Lead not found" };
    }

    // Generate HTML email content
    const emailHtml = generateProfileEmailHtml(lead);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Everest Finance <profil@everest-finance.com>",
          to: [lead.email],
          subject: `Votre profil d'investisseur : ${lead.profileTitle}`,
          html: emailHtml,
          reply_to: "contact@everest-finance.com",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Update lead with email sent status
        await ctx.runMutation(internal.investorProfiles.updateEmailStatus, {
          leadId: args.leadId,
          emailSent: true,
          emailSentAt: Date.now(),
        });

        console.log(`Email sent successfully to ${lead.email}`, result);
        return { success: true };
      } else {
        // Update lead with error
        await ctx.runMutation(internal.investorProfiles.updateEmailStatus, {
          leadId: args.leadId,
          emailSent: false,
          emailError: result.message || "Failed to send email",
        });

        console.error("Failed to send email:", result);
        return { success: false, error: result.message };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Update lead with error
      await ctx.runMutation(internal.investorProfiles.updateEmailStatus, {
        leadId: args.leadId,
        emailSent: false,
        emailError: errorMessage,
      });

      console.error("Error sending email:", error);
      return { success: false, error: errorMessage };
    }
  },
});

// Query to get lead by ID
export const getLeadById = internalQuery({
  args: {
    leadId: v.id("investorProfileLeads"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.leadId);
  },
});

// Mutation to update email status
export const updateEmailStatus = internalMutation({
  args: {
    leadId: v.id("investorProfileLeads"),
    emailSent: v.boolean(),
    emailSentAt: v.optional(v.number()),
    emailError: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, {
      emailSent: args.emailSent,
      emailSentAt: args.emailSentAt,
      emailError: args.emailError,
      updatedAt: Date.now(),
    });
  },
});

// Query to get all leads (for admin)
export const getAllLeads = query({
  args: {
    limit: v.optional(v.number()),
    profileType: v.optional(v.union(
      v.literal("conservative"),
      v.literal("moderate"),
      v.literal("balanced"),
      v.literal("growth"),
      v.literal("aggressive")
    )),
  },
  handler: async (ctx, args) => {
    let leads;
    
    if (args.profileType) {
      leads = await ctx.db
        .query("investorProfileLeads")
        .withIndex("by_profile_type", (q: any) =>
          q.eq("profileType", args.profileType)
        )
        .order("desc")
        .take(args.limit ?? 100);
    } else {
      leads = await ctx.db
        .query("investorProfileLeads")
        .order("desc")
        .take(args.limit ?? 100);
    }

    return leads;
  },
});

// Helper function to generate email HTML
function generateProfileEmailHtml(lead: {
  firstName: string;
  lastName: string;
  profileTitle: string;
  profileType: string;
  riskLevel: number;
  answers: Array<{ questionId: string; value: number }>;
  investmentAmount?: number;
}): string {
  const profileColors: Record<string, string> = {
    conservative: "#2563eb",
    moderate: "#0891b2",
    balanced: "#7c3aed",
    growth: "#ca942f",
    aggressive: "#dc2626",
  };

  const profileColor = profileColors[lead.profileType] || "#461D4C";
  const amountLabels: Record<number, string> = {
    1: "Moins de 1 000 000 FCFA",
    2: "1 000 000 – 5 000 000 FCFA",
    3: "5 000 000 – 25 000 000 FCFA",
    4: "Plus de 25 000 000 FCFA",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre profil d'investisseur</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; line-height: 1.6; color: #0a0a0a; margin: 0; padding: 0; background: #faf8f4; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #461D4C 0%, #2a1435 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.7); margin: 10px 0 0; font-size: 14px; }
    .content { padding: 40px 30px; }
    .profile-card { background: linear-gradient(135deg, ${profileColor}08, ${profileColor}03); border: 1px solid ${profileColor}20; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center; }
    .profile-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; background: ${profileColor}15; color: ${profileColor}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
    .profile-title { font-size: 28px; font-weight: 700; color: ${profileColor}; margin: 0 0 8px; }
    .risk-level { font-size: 12px; color: #666; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #461D4C; margin-bottom: 12px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .info-item { background: #f7f6f3; padding: 12px; border-radius: 8px; }
    .info-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .info-value { font-size: 14px; font-weight: 600; color: #0a0a0a; }
    .cta { text-align: center; margin-top: 32px; }
    .cta-button { display: inline-block; padding: 14px 28px; background: #cb9824; color: #ffffff; text-decoration: none; border-radius: 30px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .footer { background: #f7f6f3; padding: 24px 30px; text-align: center; font-size: 12px; color: #666; }
    .footer a { color: #461D4C; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bonjour ${lead.firstName} ${lead.lastName}</h1>
      <p>Voici votre profil d'investisseur personnalisé</p>
    </div>
    
    <div class="content">
      <div class="profile-card">
        <div class="profile-badge">Votre profil</div>
        <h2 class="profile-title">${lead.profileTitle}</h2>
        <p class="risk-level">Niveau de risque : ${lead.riskLevel} / 5</p>
      </div>
      
      <div class="section">
        <h3 class="section-title">Résumé de votre profil</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Profil</div>
            <div class="info-value">${lead.profileTitle}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tolérance au risque</div>
            <div class="info-value">${lead.riskLevel}/5</div>
          </div>
          ${lead.investmentAmount ? `
          <div class="info-item">
            <div class="info-label">Montant d'investissement</div>
            <div class="info-value">${amountLabels[lead.investmentAmount] || 'Non spécifié'}</div>
          </div>
          ` : ''}
        </div>
      </div>
      
      <div class="cta">
        <a href="https://everest-finance.com/contact" class="cta-button">Prendre rendez-vous</a>
        <p style="margin-top: 16px; font-size: 12px; color: #666;">
          Un conseiller Everest Finance vous contactera sous 24h.
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Everest Finance SGI</strong></p>
      <p>Agrément AMF-UMOA · SGI/DA/2016/60</p>
      <p style="margin-top: 12px;">
        <a href="https://everest-finance.com">everest-finance.com</a> · 
        <a href="mailto:contact@everest-finance.com">contact@everest-finance.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
