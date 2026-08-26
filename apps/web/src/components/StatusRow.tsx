import type { ReactNode } from 'react'

type StatusProps = {
  label: string
  value: string
}

export function StatusRow({ label, value }: StatusProps): ReactNode {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-3">
      <dt className="text-on-surface/60">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
