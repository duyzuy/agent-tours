"use client";
import PageContainer from "@/components/admin/PageContainer";

const PageGuide = () => {
  return (
    <PageContainer name="Hướng dẫn" modelName="Hướng dẫn" breadCrumItems={[{ title: "Hướng dẫn" }]} hideAddButton>
      <div className="page-frame relative w-full max-w-[1140px]" style={{ height: "calc(100vh - 240px)" }}>
        <iframe
          allowFullScreen
          style={{ border: 0 }}
          className="absolute left-0 top-0 w-full h-full"
          src="https://docs.google.com/document/d/1kpZTIwzvhphiR06bikszcun061batI_YlIXwSaxUC78/edit#heading=h.ptyt9r9480u4"
        ></iframe>
      </div>
    </PageContainer>
  );
};
export default PageGuide;
