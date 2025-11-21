import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { FileText, GripVertical, X } from 'lucide-react';
import { PdfFile } from '../types';
import { formatBytes } from '../utils/cn';

interface FileCardProps {
  file: PdfFile;
  index: number;
  onRemove: (id: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, index, onRemove }) => {
  return (
    <Draggable draggableId={file.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group relative flex items-center justify-between rounded-xl border p-4 transition-all ${
            snapshot.isDragging
              ? 'z-50 border-indigo-500 bg-indigo-50 shadow-xl ring-1 ring-indigo-500'
              : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-indigo-200'
          }`}
          style={provided.draggableProps.style}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div
              {...provided.dragHandleProps}
              className="cursor-grab rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5" />
            </div>
            
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <FileText className="h-5 w-5" />
            </div>
            
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatBytes(file.size)} • {file.pageCount ? `${file.pageCount} pages` : 'Loading pages...'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onRemove(file.id)}
            className="ml-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default FileCard;