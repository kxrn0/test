export default function Results({clicks, rolls, time, bestTime}) {
    const totalTime = time.end - time.start;
    const seconds = ~~(totalTime / 1000);
    const mills = totalTime % 1000; 

    const bestSecs = ~~(bestTime / 1000);
    const bestMilliSecs = bestTime % 1000;
    
    return (
        <div className="results">
            <p>clicks: {clicks}, rolls: {rolls}, duration: {seconds}s {mills}ms</p>
            <p className="best-time">best time: {bestSecs}s {bestMilliSecs}ms</p>
        </div>
    );
}