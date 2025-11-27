function Icon({ prefix = "fa-solid", name, className, labelled }) {
    return (
        <i
            className={[prefix, name, className].filter(Boolean).join(' ')}
            aria-hidden={labelled ? undefined : 'true'}
        />
    )
}

export default Icon
