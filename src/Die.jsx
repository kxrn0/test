export default function Die({freeze, die, tenzies, increase_count}) {
    function freeze_die() {
        increase_count();
        freeze(die.id);
    }

    return (
        <div className={`die ${die.frozen ? "frozen" : ''}`} onClick={tenzies ? () => console.log("tenzies!") : freeze_die}>
            {die.value}
        </div>
    );
}