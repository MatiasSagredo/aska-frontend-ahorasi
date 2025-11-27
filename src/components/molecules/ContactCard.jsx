import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Icon from '../atoms/Icon.jsx';

function ContactCard({ iconPrefix = 'fa-solid', icon, title, description, href, iconClassName }) {
    const Wrapper = href ? 'a' : 'div';

    return (
        <Wrapper
            href={href}
            className="group flex items-start gap-4 rounded-3xl border border-primary/20 bg-primary/10 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/20"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        >
            <Div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/70 text-primary-foreground shadow-md">
                <Icon prefix={iconPrefix} name={icon} className={`text-xl ${iconClassName ?? ''}`} />
            </Div>
            <Div>
                <Text variant="h3" className="font-heading text-lg font-semibold text-primary-foreground">
                    {title}
                </Text>
                <Text className="mt-1 text-sm text-primary-foreground/80">
                    {description}
                </Text>
            </Div>
        </Wrapper>
    );
}

export default ContactCard;
