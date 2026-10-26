import type { LucideIcon } from 'lucide-react'

export interface UnderConstructionAction {
  label: string
  onClick: () => void
  icon?: LucideIcon
}

export interface UnderConstructionProps {
  eyebrow?: string
  title?: string
  desc?: string
  imageSrc?: string
  primaryAction?: UnderConstructionAction
  secondaryAction?: UnderConstructionAction
}

/**
 * Module hiển thị trạng thái "Đang xây dựng" (Under Construction) dạng Plug & Play.
 * Có thể cắm vào bất kỳ trang, sub-space hoặc tính năng nào chưa hoàn thiện.
 */
export function UnderConstruction({
  eyebrow = 'COMING SOON',
  title = 'Trang đang được xây dựng',
  desc = 'Nội dung này đang trong quá trình phát triển và hoàn thiện. Hãy quay lại sớm nhé!',
  imageSrc,
  primaryAction,
  secondaryAction,
}: UnderConstructionProps) {
  const finalImageSrc = imageSrc || `${import.meta.env.BASE_URL}images/had_build.svg`

  return (
    <section className="construction-section container" aria-labelledby="construction-heading">
      <div className="construction-content">
        <div className="construction-illustration-wrapper">
          <img
            src={finalImageSrc}
            alt=""
            width="420"
            height="420"
            className="construction-illustration"
          />
        </div>

        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 id="construction-heading" className="construction-title">{title}</h1>
        {desc && <p className="construction-desc">{desc}</p>}

        {(primaryAction || secondaryAction) && (
          <div className="construction-actions">
            {primaryAction && (
              <button
                type="button"
                className="button button-primary"
                onClick={primaryAction.onClick}
              >
                {primaryAction.icon && <primaryAction.icon size={17} aria-hidden="true" />}
                <span>{primaryAction.label}</span>
              </button>
            )}

            {secondaryAction && (
              <button
                type="button"
                className="button button-outline"
                onClick={secondaryAction.onClick}
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon && <secondaryAction.icon size={17} aria-hidden="true" />}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
