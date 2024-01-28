const Leaderboard = () => {
    const leaderboardStyle = {
        width: "30rem",
        height: "40rem",
        backgroundColor: "rgba(90, 8, 8, 0.5)",
        borderColor: "#E68f45",
        borderWidth: "7px",
        borderRadius: "60px",
        color: "white",
      }
    
      const rankingStyle = {    
        fontSize: "24px",
    
    
      }
    return (       <div class="col-3">
    <div class = "card" style = {leaderboardStyle}>
      <div class = "card-body">
        <h1 class = "text-center">Leaderboards</h1>
        <div class="container" style = {rankingStyle}>
          <div class = "row p-2" id = "n1">
            <div class = "col-2">
              1
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n2">
            <div class = "col-2">
              2
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n3">
            <div class = "col-2">
              3
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n4">
            <div class = "col-2">
              4
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n5">
            <div class = "col-2">
              5
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n6">
            <div class = "col-2">
              6
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n7">
            <div class = "col-2">
              7
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n8">
            <div class = "col-2">
              8
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n9">
            <div class = "col-2">
              9
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
          <div class = "row p-2" id = "n10">
            <div class = "col-2">
              10
            </div>
            <div class = "col-7">
              Mark
            </div>
            <div class = "col-3">
              4000
            </div>
          </div>
        

        
        </div>


      </div>
    </div>
    </div>
)
}

export default Leaderboard