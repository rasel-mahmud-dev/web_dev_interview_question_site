import React, {FC} from 'preact/compat';



interface PropsType {
  label?: string,
  value: string | number,
  placeholder?: string
  name: string,
  type?: string,
  onChange: (e: any) => void
}

const InputGroup : FC<PropsType> = (props) => {
  return (
    <div className="input-group">
      <label htmlFor={"-id" +props.name}>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputGroup;