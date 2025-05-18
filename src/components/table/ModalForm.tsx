import React, { useEffect, useState } from 'react';
import { useModalStore } from '../../store/useModalStore';
import type { MyFormData  } from '../../types/modalTypes';
import useTableStore from '../../store/useTableStore';

const ModalForm = () => {
  const { isOpen, type, close, initialData, id } = useModalStore();
  const { editRow } = useTableStore();
  const startDate = {
    customer: '',
    siteDelivery: '',
    email: '',
    description: '',
  };

  const [formData, setFormData] = useState<MyFormData>(startDate);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(startDate);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = useTableStore((state) => state.addRow)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'add') {
      addRow(formData);
    } else if (id != null) {
      editRow(formData, id);
    }

    setFormData(startDate)
    close();
  };

  const handleCansel = () => {
    setFormData(startDate)
    close();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10 px-2 mr-2 md:mr-0">
      <div className="bg-white rounded-2xl w-full max-w-md p-4 sm:p-6 mx-2">
        <h2 className="text-base md:text-xl font-semibold mb-4">
          {type === 'edit' ? 'Edit Request' : 'New Request'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-1 md:space-y-4">
          <input
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Customer"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            name="siteDelivery"
            value={formData.siteDelivery}
            onChange={handleChange}
            placeholder="Site / Delivery"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCansel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
