interface ErrorsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
}

export function Errors({ errors }: ErrorsProps) {
    if (!errors) return;

    return (
        <div className="error-box">
            {errors.map((error: { message: string }) => {
                return (
                    <div className="error-message">
                        <p>{error.message}</p>
                    </div>
                );
            })}
        </div>
    );
}
