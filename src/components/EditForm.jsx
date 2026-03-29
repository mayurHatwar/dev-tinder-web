import React from "react";

const EditForm = ({
  title,
  fields,
  formValues,
  onFieldChange,
  onSubmit,
  submitLabel = "Save",
  error,
}) => {
  return (
    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-full max-w-2xl border p-6">
      {title && <h2 className="text-xl font-bold text-center mb-4">{title}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const value =
            field.name === "skills"
              ? (formValues?.[field.name] || []).join(", ")
              : (formValues?.[field.name] ?? "");

          if (field.type === "textarea") {
            return (
              <div
                key={field.name}
                className={field.fullWidth ? "md:col-span-2" : ""}
              >
                <label className="label">{field.label}</label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  value={value}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                />
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={field.name}>
                <label className="label">{field.label}</label>
                <select
                  className="select select-bordered w-full"
                  value={value}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div
              key={field.name}
              className={field.fullWidth ? "md:col-span-2" : ""}
            >
              <label className="label">{field.label}</label>
              <input
                type={field.type || "text"}
                className="input input-bordered w-full"
                value={value}
                onChange={(e) => onFieldChange(field.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {error && <p className="text-error mt-2">{error}</p>}

      <button className="btn btn-primary mt-4 w-full" onClick={onSubmit}>
        {submitLabel}
      </button>
    </fieldset>
  );
};

export default EditForm;
