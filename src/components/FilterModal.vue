<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div :style="{ overflow: 'auto', width: '100%' }" class="modal-content" @click.stop>
      <h2>Filter</h2>
      <div>Select criteria filter in listing</div>
      <button class="close-btn" @click="closeModal">X</button>

      <form @submit.prevent="applyFilters">
        <table class="borderless-table">
          <!-- Created Date Range -->
          <tr>
            <div class="form-group">
              <td>
                <label>Created Date</label>
              </td>
              <td :style="{ textAlign: 'left' }">{{ ':' }}</td>
              <div class="date-range">
                <td>
                  Display range from
                </td>
                <td>
                  <input type="date" v-model="filters.createdDateRange.from" :key="fromDateResetKeys" />
                </td>
                <td>
                  <span>to</span>
                </td>
                <td>
                  <input type="date" v-model="filters.createdDateRange.to" ref="toDate" />
                </td>
              </div>
            </div>
          </tr>

          <!-- Customer Name Dropdown -->
          <tr>
            <div class="form-group">
              <td>
                <label for="customerName">Customer Name</label>
              </td>
              <td :style="{ textAlign: 'left' }">{{ ':' }}</td>
              <div :style="{ display: 'flex', alignItems: 'center', gap: '10px', width: '70%' }">
                <td colSpan="4" :style="{ width: '100%' }">
                  <select v-model="filters.customerNames" id="customerName">
                    <option disabled value="Select name" placeholder="xxx">Select Name</option>
                    <option v-for="name in customerNames" :key="name" :value="name">{{ name }}</option>
                  </select>
                </td>
              </div>
            </div>
          </tr>

          <!-- Status Checkbox Group -->
          <tr>
            <div class="form-group">
              <td>
                <label>Status</label>
              </td>
              <td :style="{ textAlign: 'left' }">{{ ':' }}</td>
              <div :style="{ display: 'inline-flex' }">
                <label>
                  <input type="checkbox" value="All" @change="toggleAllStatuses" :checked="allStatusesChecked" />
                  <span :style="{margin: '0 0 0 -10px'}">All</span>
                </label>
                <label v-for="status in statuses" :key="status">
                  <input :style="{ marginRight: '20px' }" type="checkbox" :value="statuses"
                    @change="checkAllStatusSelection" v-model="filters.statuses" :disabled="allStatusesChecked" />
                    <span :style="{margin: '0 0 0 -10px'}">{{ status }}</span>
                </label>
              </div>
            </div>
          </tr>

          <!-- Category Checkbox Group (with 'All' option) -->
          <tr>
            <div class="form-group">
              <td>
                <label>Category</label>
              </td>
              <td :style="{ textAlign: 'left' }">{{ ':' }}</td>
              <div :style="{ display: 'inline-flex' }">
                <label>
                  <input type="checkbox" value="All" @change="toggleAllCategories" :checked="allCategoriesChecked" />
                  All
                </label>
                <label v-for="category in categories" :key="category">
                  <input type="checkbox" :value="categories" @change="checkAllCategoriesSelection"
                    v-model="filters.categories" :disabled="allCategoriesChecked" />
                  {{ category }}
                </label>
              </div>
            </div>
          </tr>

          <!-- Country Dropdown -->
          <tr>
            <div class="form-group">
              <td>
                <label for="country">Country</label>
              </td>
              <td :style="{ textAlign: 'left' }">{{ ':' }}</td>
              <div :style="{ display: 'flex', alignItems: 'center', gap: '10px', width: '70%' }">
                <td colSpan="4" :style="{ width: '100%' }">
                  <select v-model="filters.countries" id="country">
                    <option disabled value="">Select Country</option>
                    <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                  </select>
                </td>
              </div>
            </div>
          </tr>

          <hr />
          <!-- Action Buttons -->
          <div class="actions">
            <button class="filter-btn" type="button" @click="resetFields">Reset</button>
            <button class="filter-btn" type="submit">Apply Filters</button>
          </div>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    customerNames: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
    salesOrders: {
      type: Array,
      default: () => [],
    },
    statuses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultPlaceholder: 'default',
      filters: {
        // created_date: { from: "", to: "" },
        // customer_name: "",
        // country: "",
        // status: [],
        // category: [],
        createdDateRange: { from: "", to: "" },
        countries: [],
        categories: [],
        customerNames: [],
        statuses: [],
      },
      allCategoriesChecked: false,
      allStatusesChecked: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    applyFilters() {
      // Emit the applied filters to the parent component
      this.$emit("apply-filters", this.filters);
      this.closeModal();
    },
    toggleAllCategories() {
      this.allCategoriesChecked = !this.allCategoriesChecked;
      if (this.allCategoriesChecked) {
        // If "All" is checked, clear other category selections
        this.filters.categories = [];
      }
    },
    checkAllCategoriesSelection() {
      // Check if all statuses are selected
      this.allCategoriesChecked = this.categories.every(category => this.filters.categories.includes(category));

      // If no categories are selected, uncheck "All"
      if (this.filters.categories.length === 0) {
        this.allCategoriesChecked = false; // Deselect "All" if none are checked
      }
    },
    toggleAllStatuses() {
      this.allStatusesChecked = !this.allStatusesChecked;
      // this.allStatusesChecked = event.target.checked; // Update the checked status

      if (this.allStatusesChecked) {
        // If "All" is checked, clear other category selections
        this.filters.statuses = [...this.statuses];
      } else {
        this.filters.statuses = [];
      }
    },
    checkAllStatusSelection() {
      // Check if all statuses are selected
      this.allStatusesChecked = this.statuses.every(status => this.filters.statuses.includes(status));

      // If no statuses are selected, uncheck "All"
      if (this.filters.statuses.length === 0) {
        this.allStatusesChecked = false; // Deselect "All" if none are checked
      }
    },
    resetFields() {
      // this.$emit("reset-filters");

      // Reset each field to its initial value
      this.filters = {
        createdDateRange: { from: "", to: "" },
        customerNames: [],
        statuses: [],
        categories: [],
        countries: [],
      }; // Spread the initialFilters into filters

      // Clear manually typed date input fields
      this.fromDateResetKeys = 0; // or this.resetKeys++;
      this.$refs.toDate.value = "";    // Clear input


      this.allCategoriesChecked = false;
      this.allStatusesChecked = false;
      console.log("reset", this.filters);
    },
  },
};
</script>

<style scoped>
.borderless-table {
  border: none;
  border-collapse: collapse;
  width: 100%;
}

.borderless-table tr:nth-child(even) {
  background-color: white;
}

.borderless-table th,
tr,
td {
  border: none;
}

.modal-overlay {
  position: fixed;
  /* relative - str display */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

hr {
  margin: 80px 0 20px 0;
  /* Add space above and below the line */
  border: 0;
  /* Remove default border */
  height: 1px;
  /* Height of the line */
  background: #ccc;
  /* Color of the line */
}

form label {
  display: block;
  /* margin: 10px 0 5px; */
  align-items: center;
  /* align-content: center; */
}

form input,
form select {
  /* width: 100%;
  padding: 8px;
  margin-bottom: 10px; */
  width: 70%;
  padding: 8px;
}

.form-group {
  display: flex;
  align-items: center;
  margin: 10px;
}

.form-group label {
  width: 30%;
  margin-right: 10px;
  align-content: center;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 70%;
}

.date-range input {
  width: 80%;
}

.actions {
  display: flex;
  justify-content: center;
  /* margin: 20px 0px 0px; */
  /* space-between || flex-start || flex-end */
  padding: 5px;
}

.filter-btn {
  margin: 5px;
  padding: 8px 10px;
  background-color: #013648;
  color: white;
  border-radius: 3mm;
}
</style>
