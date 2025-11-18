import React from "react";
import { SECTION_HEADING, SECTION_DESC } from "./SectionStyles";

/**
 * SectionHeader
 * Props:
 * - title: string | JSX - main heading content
 * - description: string | JSX - descriptive paragraph
 * - as: heading tag to render (h1, h2, h3...). Defaults to 'h2'
 * - titleProps: additional props applied to the heading element
 * - descProps: additional props applied to the description <p>
 * - wrapperClass: extra class for the wrapper div
 */
const SectionHeader = ({
  title,
  description,
  as = "h2",
  titleProps = {},
  descProps = {},
  wrapperClass = "",
}) => {
  const Heading = as;

  const headingClass = `${SECTION_HEADING} ${titleProps.className || ""}`.trim();
  const descClass = `${SECTION_DESC} ${descProps.className || ""}`.trim();

  return (
    <div className={wrapperClass}>
      {title && (
        <Heading {...titleProps} className={headingClass}>
          {title}
        </Heading>
      )}

      {description && (
        <p {...descProps} className={descClass}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
