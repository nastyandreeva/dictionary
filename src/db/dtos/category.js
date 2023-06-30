class Category {
  /**
   *
   * @param {Object} rawCategory
   */
  constructor(rawCategory) {
    this.id = rawCategory.id;
    this.slug = rawCategory.slug;
    this.name = rawCategory.name;
    this.description = rawCategory.description;
    this.active = rawCategory.active;
    this.createdDate = rawCategory.createddate;
  }
}

module.exports = Category;
