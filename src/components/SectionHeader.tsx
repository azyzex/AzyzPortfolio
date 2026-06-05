type SectionHeaderProps = {
  eyebrow?: string;
  id?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  id,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align}`}>
      {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
