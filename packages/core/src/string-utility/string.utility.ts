export class StringUtility {
    public static convertToPascalCase(value: string): string {
        if (!value || (typeof value !== 'string') || value.match(/[0-9]+/gi)) {
            return null;
        }

        return value.match(/[a-z]+/gi)
          .map(function (str) {
            return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
          })
          .join('');
    }
}