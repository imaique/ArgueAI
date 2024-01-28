const Leaderboard = () => {
    const data = [
        { id: 1, name: "John", score: 5500 },
        { id: 2, name: "Alice", score: 4530 },
        { id: 3, name: "Bob", score: 4030 },
        { id: 4, name: "Eva", score: 4002 },
        { id: 5, name: "Charlie", score: 3807 },
        { id: 6, name: "Sophia", score: 3700 },
        { id: 7, name: "Daniel", score: 3211 },
        { id: 8, name: "Olivia", score: 2020 },
        { id: 9, name: "Liam", score: 1800 },
        { id: 10, name: "Emma", score: 1000 },
      ];
    
      const generateRows = () => {
        return data.map((item) => (
          <div className="row p-2" key={`n${item.id}`}>
            <div className="col-2">{item.id}</div>
            <div className="col-7">{item.name}</div>
            <div className="col-3">{item.score}</div>
          </div>
        ));
      };

      const rankingStyle = {    
        fontSize: "24px",
      }

      const leaderboardStyle = {
        width: "30rem",
        height: "40rem",
        backgroundColor: "#e7e5e53b",
        borderColor: "rgb(90, 8, 8)",
        borderWidth: "7px",
        borderRadius: "60px",
        color: "white",
      }

    return (  <div className="card" style={leaderboardStyle}>
    <div className="card-body">
      <h1 className="text-center pb-2">Leaderboards</h1>
      <div className="container" style={rankingStyle}>
        {generateRows()}
      </div>
    </div>
  </div>)
}

export default Leaderboard