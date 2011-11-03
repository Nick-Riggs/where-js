describe("link()", function() {
    var data = [
        { name: "Nick", age: 31 },
        { name: "Sirena", age: 26 },
        { name: "Cassie", age: 12 }
    ];

    var orders = [
        { person: "Nick", product: 1, quantity: 10 },
        { person: "Nick", product: 2, quantity: 15 },
        { person: "Sirena", product: 1, quantity: 5 }
    ];

    it("should join 1 parent to 2 children", function() {
        var result = data.where("this.name === 'Nick'").link(orders, "this.name === other.person");

        expect(result.length).toEqual(2);
        expect(result[0].left.name).toEqual("Nick");
        expect(result[0].right.quantity).toEqual(10);
        expect(result[1].right.quantity).toEqual(15);
    });

    it("should link and then be able to sort", function() {
        var result = data.link(orders, "this.name === other.person");

        expect(result[0].left.name).toNotEqual("Sirena");

        result.sort(function(a, b) {
            return a.right.quantity > b.right.quantity ? 1 :
                a.right.quantity < b.right.quantity ? -1 :
                    0;
        });

        expect(result[0].left.name).toEqual("Sirena");
    });
});