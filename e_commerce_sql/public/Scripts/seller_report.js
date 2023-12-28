// const display_products = document.getElementById('orders');

document.getElementById('search').addEventListener('click',()=>{
    const category = document.querySelector('#category').value;

    fetch('/seller/report',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({category})
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        if(res.message){
            alert(res.message)
        }
        else{
            console.log(res.orders);
                let i=0;
                show_orders(res.orders,category)
            document.querySelectorAll('.approveBtn').forEach(items=>{items.addEventListener('click',approve_order)})
        }
    })
})


function show_orders(res,category){
    
        // google.charts.load('current', {'packages':['table']});
        // google.charts.setOnLoadCallback(drawTable);
    
        // drawTable(res);
    google.charts.load("current", {packages:["corechart"]});
        
    if(category === 'product_id'){
        google.charts.setOnLoadCallback(function(){drawChart1(res)})
    }
    else if(category === 'order_date'){
        google.charts.setOnLoadCallback(function(){drawChart2(res)})
    }
    else if(category === 'order_quantity'){
        google.charts.setOnLoadCallback(function(){drawChart3(res)})
    }
    else if(category === 'order_status'){
        google.charts.setOnLoadCallback(function(){drawChart4(res)})
    }
}

function drawChart1(res) {
    var data=[['name','val']]

    res.forEach(ele=>{
        data.push([ele.name, ele.productQuantity])
    })
    data = google.visualization.arrayToDataTable(data);

    var options = {
    title: 'Ordered Products Left In Stock',
    pieHole: 0.4,
    colors: ['#c53434', '#1fb3e0', '#a0b107', '#a0b107', '#3ba00c', '#168d06', '#25e01f'],
    width: 700,
    height: 500,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}

function drawChart2(res) {
    var data= new google.visualization.DataTable()
    data.addColumn('string','Date')
    data.addColumn('number','Order placed on date')

    res.forEach(ele=>{
        console.log();
        data.addRow([(ele.orderDate).split('T')[0], ele.orderQuantity])
    })
    console.log(data);
    // data = google.visualization.arrayToDataTable(data);

    var options = {
    title: 'Order Quantity With Date',
    curveType: 'function',
    legend: {position: 'bottom'},
    width: 700,
    height: 500,
    };

    var chart = new google.visualization.LineChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}

function drawChart3(res) {
    var data=[['name','val']]

    res.forEach(ele=>{
        data.push([ele.name, ele.orderQuantity])
    })
    data = google.visualization.arrayToDataTable(data);

    var options = {
    title: 'Order Status',
    pieHole: 0.4,
    colors: ['#c53434', '#1fb3e0', '#a0b107', '#a0b107', '#3ba00c', '#168d06', '#25e01f'],
    width: 700,
    height: 500,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}

function drawChart4(res) {
    var data=[['name','val']]

    res.forEach(ele=>{
        data.push([ele.name, ele.order_status])
    })
    data = google.visualization.arrayToDataTable(data);

    var options = {
    title: 'Order Status',
    pieHole: 0.4,
    colors: ['#c53434', '#1fb3e0', '#a0b107', '#a0b107', '#3ba00c', '#168d06', '#25e01f'],
    width: 700,
    height: 500,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}

async function drawTable(res) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Product Name');
    data.addColumn('string', 'Product Stock');
    data.addColumn('number', 'Order Quantity');
    data.addColumn('number', 'Order Count');
    data.addColumn('string', 'Order Status');
    await res.forEach(ele=>{
        data.addRows([
            [`${ele.name}`, ele.productQuantity,  {v: ele.orderQuantity, f: `${ele.orderQuantity}`}, ele.orderCount, `${ele.order_status.toUpperCase()}`],
        ])
    })

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%', color: '#000000'});
}

document.querySelector('#logoutBtn').addEventListener('click',()=>{

    fetch('/user/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res=>{
        return res.json();
    })
    .then(res=>{
        window.location.href = res.url;
    })
})