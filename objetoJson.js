const produto = [
    {"id": 1, "nome": "notebook", "preco": 2500.00},
    {"id": 2, "nome": "smartphone", "preco": 1500.00}
];

app.get('/produtos', (req, res) => {
    res.status(200).json(produto);
});