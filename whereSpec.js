describe("where()", function() {
    var data = [
        { name: "Nick", age: 31 },
        { name: "Sirena", age: 26 },
        { name: "Cassie", age: 12 }
    ];

    it("should take 1 param and return 2 results", function() {
        var result = data.where("this.age > @minAge", { minAge: 15 });
        
        expect(result.length).toEqual(2);
    });

    it("should take no params and return 1 result", function() {
        var result = data.where("this.name === 'Cassie'");

        expect(result.length).toEqual(1);
    });

    it("should ignore dangerous params", function() {
        var localVar = 1;
        var result = data.where("this.name === '@name'", {
            name: function() { localVar = 1; }
        });

        expect(result.length).toEqual(0);
        expect(localVar).toEqual(1);
    });

    it("should not modify the outer params object", function() {
        var params = {
            name: "Nick",
            something: function() { }
        };

        data.where("this.name === '@name'", params);

        expect(typeof params.something).toEqual("function");
    });
});