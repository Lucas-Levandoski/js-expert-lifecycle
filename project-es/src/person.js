export class Person {
  constructor({ id, vehicles, kmTraveled, from, to}) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted (language) {
    const from = new Date(this.from);
    const to = new Date(this.to);

    return {
      id: Number(this.id),
      vehicles: new Intl
        .ListFormat(language, { style: 'long', type: 'conjunction' })
        .format(this.vehicles),
      kmTraveled: new Intl
        .NumberFormat(language, { style: 'unit', unit: 'kilometer' })
        .format(this.kmTraveled),
      from: new Intl
        .DateTimeFormat(language, { style: 'long', day: '2-digit', month: 'short', year: 'numeric' })
        .format(from),
      to: new Intl
        .DateTimeFormat(language, { style: 'long', day: '2-digit', month: 'long', year: 'numeric' })
        .format(to)
    }
  }

  static generateInstanceFromString(instance) {
    const [ id, vehicles, kmTraveled, from, to ] = instance.split(' ');

    return new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    })
  }
}