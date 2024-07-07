"use client";
import styled from "styled-components";
interface AreaContentHtmlProps {
  content: string;
}
const AreaContentHtml: React.FC<AreaContentHtmlProps> = ({ content = "" }) => {
  return (
    <AreaContentStyled
      className="area-content"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    ></AreaContentStyled>
  );
};
export default AreaContentHtml;

const AreaContentStyled = styled("div")`
  ul {
    list-style-type: disc;
  }
`;
