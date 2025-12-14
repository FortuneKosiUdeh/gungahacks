import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`text-sm font-medium leading-none text-gray-700 cursor-pointer ${className || ''}`}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
