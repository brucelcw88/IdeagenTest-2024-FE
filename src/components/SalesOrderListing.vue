<template>
  <h1>Sales Orders from MySQL DB</h1>

  <div>
    <!-- Filter button -->
    <!-- <div :style="{margin: '0 auto', width: 'max-content', display: 'flex', justifyContent:'flex-end'}">
      <button class="btn btn-primary customise-filter-btn" @click="showModal = true"><i class="fa fa-filter"></i></button>
      <FilterModal v-if="showModal" :isVisible="showModal" :customerNames="customerNames" :countries="countries"
        :categories="categories" :statuses="statuses" :salesOrders="salesOrders" @apply-filters="handleApplyFilters"
        @close="showModal = false" />
    </div> -->

    <!-- Table -->
    <div :style="{ overflowX: 'auto' }"> <!-- overflowX="auto": page level -->
      <button class="btn btn-primary customise-filter-btn" @click="showModal = true"><i class="fa fa-filter"></i></button>
      <FilterModal v-if="showModal" :isVisible="showModal" :customerNames="customerNames" :countries="countries"
        :categories="categories" :statuses="statuses" :salesOrders="salesOrders" @apply-filters="handleApplyFilters"
        @close="showModal = false" />
      <table id="ptable">
        <thead>
          <tr class="header">
            <th class="right-aligned">Order No</th>
            <th class="left-aligned">Customer Name</th>
            <th class="left-aligned">Status</th>
            <th class="left-aligned">Category</th>
            <th class="left-aligned">Country</th>
            <th class="right-aligned">Created Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="error || salesOrders.length === 0">
            <td colspan="6" class="no-data">No data is found and retrieve</td>
          </tr>
          <tr v-else v-for="salesOrder in salesOrders" :key="salesOrder.orderNo">
            <td :style="{ textAlign: 'right', padding: '10px' }">{{ salesOrder.orderNo }}</td>
            <td class="left-aligned">{{ salesOrder.customerName }}</td>
            <td class="left-aligned">{{ salesOrder.status }}</td>
            <td class="left-aligned">{{ salesOrder.category }}</td>
            <td class="left-aligned">{{ salesOrder.country }}</td>
            <td class="right-aligned">{{ salesOrder.createdDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FilterModal from './FilterModal.vue';

const formatDataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
export default {
  name: 'SalesOrderListing',
  components: { FilterModal },
  data() {
    return {
      salesOrders: [{
        orderNo: 0,
        customerName: '-',
        status: '-',
        category: 0,
        country: '-',
        createdDate: new Date('01/01/0001').toLocaleDateString(formatDataOptions)
      }],
      error: false,
      showModal: true,
      countries: [],
      categories: [],
      customerNames: [],
      statuses: [],
    };
  },
  mounted() {
    this.fetchSalesOrders();
  },
  methods: {
    fetchSalesOrders() {
      axios.get('http://localhost:3001/api/sales_order')
        .then(response => {
          console.log("response.data>> ", response.data);
          const uniqueStatuses = new Set();
          const uniqueCustomerNames = new Set();
          const uniqueCountries = new Set();
          const uniqueCategories = new Set();


          this.salesOrders = response.data.map((item) => {
            uniqueStatuses.add(item.status);
            uniqueCustomerNames.add(item.customer_name);
            uniqueCountries.add(item.country);
            uniqueCategories.add(item.category);

            return {
              ...item,
              orderNo: item.object_id,
              customerName: item.customer_name,
              createdDate: this.formatDate(item.created_date)
            }
          })
          // Convert Sets to Array
          this.statuses = [...uniqueStatuses];
          this.customerNames = [...uniqueCustomerNames];
          this.categories = [...uniqueCategories];
          this.countries = [...uniqueCountries];
        })
        .catch(error => {
          console.error('Error fetching sales order lists:', error);
          this.error = true
        });
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, formatDataOptions)
    },
    handleApplyFilters(filters) {
      console.log("Applied filters:", filters);
    },
  }
};
</script>

<style>
/* Add styles if needed */

.left-aligned {
  text-align: left;
  padding: 10px;
}

.right-aligned {
  text-align: right;
  padding: 10px;
}

#ptable {
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  /* default table border */
  border: 2px solid black;
  border-spacing: unset;
  border-collapse: collapse;
}

tr:nth-child(even) {
  background-color: lightgray;
}

tr,
td {
  vertical-align: auto;
}

tr,
td,
#ptable .table-border {
  border-left: 1px solid #013648;
  border-right: 1px solid #013648;
  border-bottom: 1px solid #013648;
  border-top: 1px solid #013648;
}

.header {
  background-color: #013648;
  color: white;
  padding: 10px;
}

.no-data {
  text-align: center;
  font-weight: bold;
  color: #999;
  padding: 10px;
}

.customise-filter-btn {
  width: 30px; /* Width of the square */
  height: 30px; /* Height of the square */
  background-color: white; /* Blue color, can change to any color */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  border-radius: 5px; /* Optional: Rounded corners */
  cursor: pointer;
  transition: background-color 0.3s;
}

.customise-filter-btn:hover {
  background-color: #013648; /* Darker shade on hover */
  color: white;
}

.fa fa-filter:hover {
  color: white;
}
</style>
