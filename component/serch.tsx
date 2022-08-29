export default function Search() {
    const onClickSearch = () => {
        return(
            fetch('/api/items') , {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify
            }
        )
    }
  return (
    <div className="panel panel-default">
      <div className="panel-title">
        <p>商品を検索する</p>
      </div>
      <div className="panel-body">
        <form method="post" action="#" className="form-horizontal">
          <label htmlFor="name">商品名</label>
          <input
            type="text"
            id="name"
            name="name"
            value="name"
          ></input>
          <button type="button" value="検索" className="btn btn-primary"></button>
          <button type="reset" value="クリア" className="btn btn-default"></button>
        </form>
      </div>
    </div>
  );
}
