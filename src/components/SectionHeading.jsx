export default function SectionHeading({ eyebrow, title, description, light = false, centered = true }) {
  return (
    <div
      className={[
        "section-heading",
        centered ? "section-heading--center" : "",
        light ? "section-heading--light" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
