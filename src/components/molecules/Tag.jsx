import Text from '../atoms/Text.jsx'

function Tag({ children, className }) {
  return <Text className={"bg-red-400 rounded-3xl p-2"}>{children}</Text>
}

export default Tag