/**
 * @author Shezad Khan
 * @description This is a spec file that test the factory function provided increments the value with a unit 1
 */

import { uniqueIdProvider } from './unique-id-generator.provider';

fdescribe('Unique ID generator', function () {
    let id: number;
    it("should increment the id with 1", function () {
        id = uniqueIdProvider();
        const incrementedId = uniqueIdProvider();
        expect(incrementedId - 1).toEqual(id);
    });
});
