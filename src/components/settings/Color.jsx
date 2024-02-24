
const Color = ({
  inputRef,
  attribute,
  handleInputChange,
  attributeType
}) => (

  <div
    className='
        flex items-center gap-2 border border-primary-grey-200 
        p-3 md:p-5 bg-slate-600 cursor-pointer shadow-lg shadow-black/65
    '
    onClick={() => inputRef.current.click()}
  >
    <input
      type='color'
      value={attribute}
      ref={inputRef}
      onChange={(e) => handleInputChange(attributeType, e.target.value)}
    />
  </div>

);

export default Color;
