import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Icon from '../atoms/Icon.jsx';
import Button from '../atoms/Button.jsx';

function getStyles(type) {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-green-100',
        border: 'border-green-300',
        text: 'text-green-800',
        icon: 'text-green-600',
        iconName: 'check-circle'
      };
    case 'warning':
      return {
        bg: 'bg-yellow-100',
        border: 'border-yellow-300',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        iconName: 'exclamation-triangle'
      };
    case 'error':
      return {
        bg: 'bg-red-100',
        border: 'border-red-300',
        text: 'text-red-800',
        icon: 'text-red-600',
        iconName: 'x-circle'
      };
    default:
      return {
        bg: 'bg-primary-100',
        border: 'border-primary/30',
        text: 'text-primary-foreground',
        icon: 'text-primary-600',
        iconName: 'info-circle'
      };
  }
}

export default function Alert({
  type = 'info',
  title,
  message,
  visible = true,
  dismissible = true,
  onClose,
  children,
  className = ''
}) {
  if (!visible) return null;

  const p = getStyles(type);
  const icon = p.iconName;

  return (
    <Div className={`w-full rounded-lg border p-3 flex items-start gap-3 ${p.bg} ${p.border} ${className}`}>
      <Div className={`mt-0.5 shrink-0 ${p.icon}`}>
        <Icon name={icon} className="w-5 h-5" />
      </Div>
      <Div className="flex-1">
        {title && (
          <Text className={`font-semibold mb-1 ${p.text}`}>{title}</Text>
        )}
        <Text className={`text-sm ${p.text}`}>{children ?? message}</Text>
      </Div>
      {dismissible && (
        <Div className="shrink-0">
          <Button
            type="button"
            className="p-1 rounded-md bg-transparent hover:bg-black/5"
            onClick={(e) => {
              e.preventDefault();
              if (typeof onClose === 'function') onClose();
            }}
            aria-label="Cerrar alerta"
          >
            <Icon name="x" className="w-4 h-4 text-current" />
          </Button>
        </Div>
      )}
    </Div>
  );
}
