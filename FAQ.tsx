import React from 'react';

const FAQs = [
  {
    question: "How do I combine PDF files for free?",
    answer: "You can use MergeFlow's free PDF merger. Drag and drop your files into the box, arrange them in your desired order, and click 'Merge PDFs'. It's free, fast, and no signup is required."
  },
  {
    question: "Is this PDF Combiner secure?",
    answer: "Yes! We use advanced client-side technology. When you use our PDF joiner, your files are processed entirely within your browser. They are never uploaded to our servers, ensuring 100% privacy."
  },
  {
    question: "Is there a limit to how many files I can merge?",
    answer: "No. MergeFlow is a truly free PDF merger with no limits. You can combine as many PDF files as you want, as many times as you need."
  },
  {
    question: "Does this work on Mac and Windows?",
    answer: "Yes. Our online PDF combiner works on all devices including Mac, Windows, Linux, and mobile devices (Android & iOS). All you need is a modern web browser."
  },
  {
    question: "Will my merged PDF have a watermark?",
    answer: "No. We do not add any watermarks to your documents. The output is a clean, professional PDF file."
  }
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Common questions about using our <strong>free online PDF merger</strong>.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl divide-y divide-slate-900/10">
            {FAQs.map((faq, index) => (
                <div key={index} className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-slate-900">{faq.question}</h3>
                    <p className="mt-2 text-base leading-7 text-slate-600">{faq.answer}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;