export const InputField = ({ value, updateText, handleAction }) => {
    return (
        <div>
            <label>
                <input type="text" value={value} onChange={(e) => updateText(e.target.value)}/>
                <button onClick={() => handleAction()}>Add Todo</button>
            </label>
        </div>
    );
};