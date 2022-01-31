import classNames from 'classnames'

interface InputGroupProps {
  className?: string
  type: string
  placeholder: string
  value: string
  errors: string | undefined
  setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  errors,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          'w-full rounded border-gray-100 bg-white p-3 outline-none',
          { 'border-red-600': errors }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-green">{errors}</small>
    </div>
  )
}

export default InputGroup
