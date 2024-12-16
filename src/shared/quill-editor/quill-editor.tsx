import ReactQuill, { type ReactQuillProps } from 'react-quill';
import { Button, FieldError } from 'rizzui';
import 'react-quill/dist/quill.snow.css';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaPenFancy } from 'react-icons/fa';

interface QuillEditorProps extends ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: 'top' | 'bottom';
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = 'top',
  ...props
}: QuillEditorProps) {
  const quillModules = {
    toolbar: [
    //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],
    ],
  };

  // const quillFormats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'list',
  //   'bullet',
  //   'blockquote',
  //   'code-block',
  //   'script',
  //   'indent',
  //   'color',
  //   'background',
  //   'font',
  //   'align',
  // ];

  return (
    <div className={cn(className)}>
      <div className='flex justify-between'>

      {label && (
        <label className={'mb-1.5 block'}>{label}</label>
      )}
      
      </div>
      <ReactQuill
        modules={quillModules}
        // formats={quillFormats}
        className={cn(
          'react-quill',
          toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
          className
        )}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  );
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
