var ShowCases = React.createClass({
    loadCases: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCases();
    },
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">ShowCases</a>
                        </div>
                        <ShowCaseSearch />
                    </div>
                </nav>
                <ShowCaseList data={this.state.data} />
            </div>
        );
    }
});

var ShowCaseSearch = React.createClass({
    render: function() {
        return (
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                </form>
            </div>
        );
    }
});

var ShowCaseList = React.createClass({
    render: function() {
        var showcases = this.props.data.map(function(showcase) {
            return (
                <ShowCase key={showcase.id} link={showcase.link} name={showcase.name} img={showcase.img} desc={showcase.desc} cname={showcase.class}/>
            );
        });
        return (
            <div className="show-case-list">
                {showcases}
            </div>
        );
    }
});

var ShowCase = React.createClass({
    render: function() {
        var cname = this.props.cname + " thumbnail showcase";
        return (
            <div className="col-sm-4 col-md-4">
                <a href={this.props.link} className={cname}>
                    <div className="caption">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.desc}</p>
                    </div>
                </a>
            </div>
        );
    }
});

ReactDOM.render(
    <ShowCases url="http://api.familyoffeng.us/showcase" />,
    document.getElementById('content')
);
