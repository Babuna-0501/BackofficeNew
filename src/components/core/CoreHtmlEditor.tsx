import { FunctionComponent } from 'react';
import Editor from 'react-simple-wysiwyg';

interface CoreHtmlEditorProps {
  html: string;
  setHtml: (html: string) => void;
  label?: string;
}

const CoreHtmlEditor: FunctionComponent<CoreHtmlEditorProps> = ({ html, setHtml, label }) => {
  function onChange(e: { target: { value: string } }) {
    setHtml(e.target.value);
  }

  return (
    <div className='flex flex-col gap-4 w-full flex-1'>
      {label && <label className='text-xs font-medium'>{label}</label>}
      <Editor value={html} onChange={onChange} />
    </div>
  );
};

export default CoreHtmlEditor;
