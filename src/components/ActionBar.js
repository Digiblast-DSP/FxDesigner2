export function ActionBar({compile}) {
    return (
        <div className="action-bar">
            <div className="compile-button action-bar-button" onClick={compile}>Compile</div>
        </div>
    );
}