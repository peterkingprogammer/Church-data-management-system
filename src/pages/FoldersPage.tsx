import React, { useState } from 'react';
import { FolderOpen, Plus, MessageCircle, FileText, Users, Settings } from 'lucide-react';

export default function FoldersPage() {
  const [folders] = useState([
    { id: 1, name: 'Foundation Programs', type: 'foundation', description: 'Basic Christian foundation courses', comments: 12 },
    { id: 2, name: 'Integration Programs', type: 'integration', description: 'Programs to integrate new members', comments: 8 },
    { id: 3, name: 'Youth Ministry', type: 'custom', description: 'Youth-focused programs and activities', comments: 15 },
    { id: 4, name: 'Worship Team', type: 'custom', description: 'Worship and music ministry resources', comments: 6 },
  ]);

  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Folders</h1>
          <p className="text-gray-600">Organize church programs and resources</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Folder
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folders List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
                  selectedFolder === folder.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FolderOpen className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{folder.name}</h3>
                      <span className="text-xs text-gray-500 capitalize">{folder.type}</span>
                    </div>
                  </div>
                  <Settings className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">{folder.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {folder.comments} comments
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Folder Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {selectedFolder ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {folders.find(f => f.id === selectedFolder)?.name}
              </h3>
              
              {/* Comment Types */}
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">General Comments</h4>
                  <p className="text-sm text-gray-600">Discussion and feedback</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900">Service Notes</h4>
                  <p className="text-sm text-gray-600">Notes from services</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900">PD Notes</h4>
                  <p className="text-sm text-gray-600">Pastor's desk directives</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium text-gray-900">Internal Updates</h4>
                  <p className="text-sm text-gray-600">Administrative updates</p>
                </div>
              </div>

              {/* Add Comment */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Comment
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter your comment..."
                />
                <div className="flex justify-between items-center mt-3">
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>General Comment</option>
                    <option>Service Note</option>
                    <option>PD Note</option>
                    <option>Internal Update</option>
                  </select>
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a folder to view details and add comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}