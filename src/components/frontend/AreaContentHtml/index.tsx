"use client";
import classNames from "classnames";
import styled from "styled-components";
interface AreaContentHtmlProps {
  content?: string;
  className?: string;
}
const AreaContentHtml: React.FC<AreaContentHtmlProps> = ({ content = "", className = "" }) => {
  return (
    <AreaContentStyled
      className={classNames("area-content", {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    ></AreaContentStyled>
  );
};
export default AreaContentHtml;

const AreaContentStyled = styled("div")`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 15px;
    font-weight: 500;
  }
  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 15px;
  }
  img.center {
    margin-left: auto;
    margin-right: auto;
  }
  img {
    max-width: 100% !important;
  }
  figure {
    margin-bottom: 15px;
    figcaption {
      padding: 10px 0;
      text-align: center;
      font-style: italic;
    }
  }
  .center {
    text-align: center;
  }
`;
