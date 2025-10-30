import React from 'react';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="w-full mx-auto max-w-4xl px-8 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-8 text-center">{title}</h2>
        <div className="text-gray-200">
          {children}
        </div>
    </div>
  );
};

export default PageContainer;