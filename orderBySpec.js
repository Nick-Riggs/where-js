describe("orderBy()", function() {
    var getData = function() {
        return [
                { name: "Nick", age: 31 },
                { name: "Sirena", age: 26 },
                { name: "Cassie", age: 15 },
                { name: "Cassie", age: 12 }
            ];
    };

    it("should sort by a single field", function() {
        var result = getData();
        expect(result[0].age).toNotEqual(12);

        result.orderBy("age");
        
        expect(result[0].age).toEqual(12);
    });

    it("should sort by 2 fields", function() {
        var result = getData();

        expect(result[0].name).toEqual("Nick");

        result.orderBy("name, age");

        expect(result[0].name).toEqual("Cassie");
        expect(result[1].name).toEqual("Cassie");
        expect(result[0].age).toEqual(12);
        expect(result[1].age).toEqual(15);
    });
});