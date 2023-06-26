interface FullButtonProps {
  label : any
  func: Function
  background: string
  radius?: number
  color: string
  height?: number
  outline?: boolean
  disabled?: boolean
  size?: number
  weight?:any
  customClass?: string

}
function FullButton({customClass, label, func, background, radius=4, color, height=48, outline=false, size=14, weight=400, disabled=false}: FullButtonProps) {
  return <div className={`full-button flex justify-center items-center cursor-pointer text-center ${customClass}`}
  onClick={(e: any) => {
    if(func) {
      func(e)
    }
  }}
  style={{background: !outline ? background : 'transparent', 
  padding: '0px 15px',
  pointerEvents: disabled ? 'none': 'initial',
  opacity: disabled ? .5: 1,
  borderRadius: radius, color : color, height: height, borderWidth: outline ? 1: 0, borderStyle: outline ? 'solid': 'none', borderColor: outline ? color : 'transparent', fontSize: size, fontWeight: weight}}
  >
    {label}
  </div>;
}

export default FullButton;
