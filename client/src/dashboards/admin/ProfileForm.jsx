import { useState } from "react";

const ProfileForm = ({ hospitalData, onUpdate }) => {
  const [formData, setFormData] = useState(hospitalData);
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(hospitalData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name
            </label>
            <input
              type="text"
              value={formData?.hospitalName}
              onChange={(e) =>
                setFormData({ ...formData, hospitalName: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  : "bg-gray-50"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData?.hospitalEmail}
              onChange={(e) =>
                setFormData({ ...formData, hospitalEmail: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  : "bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
             Ph no:
          </label>
          <input
            type="tel"
            value={formData?.hospitalPhno}
            onChange={(e) =>
              setFormData({ ...formData, hospitalPhno: e.target.value })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
              isEditing
                ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                : "bg-gray-50"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospital Type
            </label>
            <input
              type="text"
              value={formData?.hospitalType}
              onChange={(e) =>
                setFormData({ ...formData, hospitalType: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  : "bg-gray-50"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData?.hospitalAddress
}
              onChange={(e) =>
                setFormData({ ...formData, hospitalAddress: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing
                  ? "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  : "bg-gray-50"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
