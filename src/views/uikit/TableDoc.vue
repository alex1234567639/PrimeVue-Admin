<script setup>
import { onBeforeMount, reactive, ref } from "vue";

/* ======= 假資料 (mock) ======= */
const mockCustomers = [
  {
    id: "1001",
    name: "John Doe",
    country: { name: "United States", code: "us" },
    representative: { name: "Amy Elsner", image: "amyelsner.png" },
    date: new Date(),
    balance: 10234.5,
    status: "qualified",
    activity: 72,
    verified: true,
  },
  {
    id: "1002",
    name: "Mary Jane",
    country: { name: "Canada", code: "ca" },
    representative: { name: "Anna Fali", image: "annafali.png" },
    date: new Date(Date.now() - 86400000 * 3),
    balance: 5432.0,
    status: "unqualified",
    activity: 20,
    verified: false,
  },
  {
    id: "1003",
    name: "Alice Wu",
    country: { name: "Taiwan", code: "tw" },
    representative: { name: "Asiya Javayant", image: "asiyajavayant.png" },
    date: new Date(Date.now() - 86400000 * 10),
    balance: 1200,
    status: "new",
    activity: 45,
    verified: true,
  },
];

const mockProducts = [
  {
    id: "p1",
    name: "Product A",
    image: "product1.png",
    price: 129.99,
    category: "Category 1",
    rating: 4,
    inventoryStatus: "INSTOCK",
    orders: [
      {
        id: "o1",
        customer: "John Doe",
        date: "2023-08-01",
        amount: 129.99,
        status: "DELIVERED",
      },
    ],
  },
  {
    id: "p2",
    name: "Product B",
    image: "product2.png",
    price: 59.99,
    category: "Category 2",
    rating: 3,
    inventoryStatus: "LOWSTOCK",
    orders: [
      {
        id: "o2",
        customer: "Mary Jane",
        date: "2023-09-11",
        amount: 59.99,
        status: "PENDING",
      },
    ],
  },
];

/* ======= state ======= */
const customers1 = ref(null);
const customers2 = ref(null);
const customers3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(false);
const balanceFrozen = ref(false);
const products = ref(null);
const expandedRows = ref([]);

const statuses = reactive([
  "unqualified",
  "qualified",
  "new",
  "negotiation",
  "renewal",
  "proposal",
]);
const representatives = reactive([
  { name: "Amy Elsner", image: "amyelsner.png" },
  { name: "Anna Fali", image: "annafali.png" },
  { name: "Asiya Javayant", image: "asiyajavayant.png" },
  { name: "Bernardo Dominic", image: "bernardodominic.png" },
  { name: "Elwin Sharvill", image: "elwinsharvill.png" },
  { name: "Ioni Bowcher", image: "ionibowcher.png" },
  { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
  { name: "Onyama Limba", image: "onyamalimba.png" },
  { name: "Stephen Shaw", image: "stephenshaw.png" },
  { name: "XuXue Feng", image: "xuxuefeng.png" },
]);

/* =======  severity helpers (不動) ======= */
function getOrderSeverity(order) {
  switch (order.status) {
    case "DELIVERED":
      return "success";
    case "CANCELLED":
      return "danger";
    case "PENDING":
      return "warn";
    case "RETURNED":
      return "info";
    default:
      return null;
  }
}

function getSeverity(status) {
  switch (status) {
    case "unqualified":
      return "danger";
    case "qualified":
      return "success";
    case "new":
      return "info";
    case "negotiation":
      return "warn";
    case "renewal":
      return null;
  }
}

function getStockSeverity(product) {
  switch (product.inventoryStatus) {
    case "INSTOCK":
      return "success";
    case "LOWSTOCK":
      return "warn";
    case "OUTOFSTOCK":
      return "danger";
    default:
      return null;
  }
}

/* ======= 初始化與 mock data 指派 ======= */
onBeforeMount(() => {
  // 模擬從 API 拿資料
  customers1.value = JSON.parse(JSON.stringify(mockCustomers));
  customers2.value = JSON.parse(JSON.stringify(mockCustomers));
  customers3.value = JSON.parse(JSON.stringify(mockCustomers));
  products.value = JSON.parse(JSON.stringify(mockProducts));

  // 將 date 欄位轉成 Date（若是字串）
  if (customers1.value) {
    customers1.value.forEach((c) => {
      c.date = c.date ? new Date(c.date) : new Date();
    });
  }

  initFilters1();
});

/* ======= filters 不再使用 primevue/api，直接用字串 matchMode ======= */
function initFilters1() {
  filters1.value = {
    global: { value: null, matchMode: "contains" },
    name: {
      operator: "AND",
      constraints: [{ value: null, matchMode: "startsWith" }],
    },
    "country.name": {
      operator: "AND",
      constraints: [{ value: null, matchMode: "startsWith" }],
    },
    representative: { value: null, matchMode: "in" },
    date: {
      operator: "AND",
      constraints: [{ value: null, matchMode: "dateIs" }],
    },
    balance: {
      operator: "AND",
      constraints: [{ value: null, matchMode: "equals" }],
    },
    status: {
      operator: "OR",
      constraints: [{ value: null, matchMode: "equals" }],
    },
    activity: { value: [0, 100], matchMode: "between" },
    verified: { value: null, matchMode: "equals" },
  };
}

/* 清除篩選 */
function clearFilter() {
  initFilters1();
}

/* expand / collapse */
function expandAll() {
  if (!products.value) return;
  const acc = {};
  products.value.forEach((p) => (acc[p.id] = true));
  expandedRows.value = acc;
}

function collapseAll() {
  expandedRows.value = null;
}

/* helper format */
function formatCurrency(value) {
  if (value == null) return "";
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* group footer helper */
function calculateCustomerTotal(name) {
  let total = 0;
  if (customers3.value) {
    for (let customer of customers3.value) {
      if (customer.representative.name === name) total++;
    }
  }
  return total;
}
</script>

<template>
  <div class="card">
    <div class="mb-4 text-xl font-semibold">Filtering (mock data)</div>
    <DataTable
      :value="customers1"
      paginator
      :rows="10"
      dataKey="id"
      rowHover
      v-model:filters="filters1"
      filterDisplay="menu"
      :loading="loading1"
      :globalFilterFields="[
        'name',
        'country.name',
        'representative.name',
        'balance',
        'status',
      ]"
      showGridlines
    >
      <template #header>
        <div class="flex justify-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          />
          <div class="flex items-center gap-2">
            <i class="pi pi-search" />
            <InputText
              v-model="filters1.global.value"
              placeholder="Keyword Search"
            />
          </div>
        </div>
      </template>

      <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">{{ data.name }}</template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" placeholder="Search by name" />
        </template>
      </Column>

      <Column
        header="Country"
        filterField="country.name"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${data.country.code}`"
              style="width: 24px"
            />
            <span>{{ data.country.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            placeholder="Search by country"
          />
        </template>
      </Column>

      <Column
        header="Agent"
        filterField="representative"
        :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :alt="data.representative.name"
              :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
              style="width: 32px"
            />
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel }">
          <MultiSelect
            v-model="filterModel.value"
            :options="representatives"
            optionLabel="name"
            placeholder="Any"
          />
        </template>
      </Column>

      <Column
        header="Date"
        filterField="date"
        dataType="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">{{ formatDate(data.date) }}</template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" placeholder="mm/dd/yyyy" />
        </template>
      </Column>

      <Column
        header="Balance"
        filterField="balance"
        dataType="numeric"
        style="min-width: 10rem"
      >
        <template #body="{ data }">{{ formatCurrency(data.balance) }}</template>
        <template #filter="{ filterModel }">
          <InputNumber
            v-model="filterModel.value"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </template>
      </Column>

      <Column
        header="Status"
        field="status"
        :filterMenuStyle="{ width: '14rem' }"
        style="min-width: 12rem"
      >
        <template #body="{ data }"
          ><Tag :value="data.status" :severity="getSeverity(data.status)"
        /></template>
        <template #filter="{ filterModel }">
          <Select
            v-model="filterModel.value"
            :options="statuses"
            placeholder="Select One"
            showClear
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option"
                :severity="getSeverity(slotProps.option)"
              />
            </template>
          </Select>
        </template>
      </Column>

      <Column
        field="activity"
        header="Activity"
        :showFilterMatchModes="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }"
          ><ProgressBar
            :value="data.activity"
            :showValue="false"
            style="height: 6px"
        /></template>
        <template #filter="{ filterModel }">
          <Slider v-model="filterModel.value" range class="m-4" />
          <div class="flex items-center justify-between px-2">
            <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
            <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
          </div>
        </template>
      </Column>

      <Column
        field="verified"
        header="Verified"
        dataType="boolean"
        bodyClass="text-center"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500': data.verified,
              'pi-times-circle text-red-500': !data.verified,
            }"
          ></i>
        </template>
        <template #filter="{ filterModel }">
          <label for="verified-filter" class="font-bold">Verified</label>
          <Checkbox
            v-model="filterModel.value"
            :indeterminate="filterModel.value === null"
            binary
            inputId="verified-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <!-- 下面兩個區塊用 mock products / customers2 測試 -->
  <div class="card mt-6">
    <div class="mb-4 text-xl font-semibold">Frozen Columns</div>
    <ToggleButton
      v-model="balanceFrozen"
      onIcon="pi pi-lock"
      offIcon="pi pi-lock-open"
      onLabel="Balance"
      offLabel="Balance"
    />
    <DataTable :value="customers2" scrollable scrollHeight="400px" class="mt-6">
      <Column
        field="name"
        header="Name"
        style="min-width: 200px"
        frozen
        class="font-bold"
      />
      <Column field="id" header="Id" style="min-width: 100px" />
      <Column field="country.name" header="Country" style="min-width: 200px" />
      <Column field="date" header="Date" style="min-width: 200px" />
      <Column field="company" header="Company" style="min-width: 200px" />
      <Column field="status" header="Status" style="min-width: 200px" />
      <Column field="activity" header="Activity" style="min-width: 200px" />
      <Column
        field="representative.name"
        header="Representative"
        style="min-width: 200px"
      />
      <Column
        field="balance"
        header="Balance"
        style="min-width: 200px"
        alignFrozen="right"
        :frozen="balanceFrozen"
      >
        <template #body="{ data }"
          ><span class="font-bold">{{
            formatCurrency(data.balance)
          }}</span></template
        >
      </Column>
    </DataTable>
  </div>

  <div class="card mt-6">
    <div class="mb-4 text-xl font-semibold">Row Expansion</div>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="products"
      dataKey="id"
      tableStyle="min-width:60rem"
    >
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button
            text
            icon="pi pi-plus"
            label="Expand All"
            @click="expandAll"
          />
          <Button
            text
            icon="pi pi-minus"
            label="Collapse All"
            @click="collapseAll"
          />
        </div>
      </template>

      <Column expander style="width: 5rem" />
      <Column field="name" header="Name" />
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="shadow-lg"
            width="64"
          />
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">{{
          formatCurrency(slotProps.data.price)
        }}</template>
      </Column>
      <Column field="category" header="Category" />
      <Column field="rating" header="Reviews">
        <template #body="slotProps"
          ><Rating :modelValue="slotProps.data.rating" readonly
        /></template>
      </Column>
      <Column header="Status">
        <template #body="slotProps"
          ><Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getStockSeverity(slotProps.data)"
        /></template>
      </Column>

      <template #expansion="slotProps">
        <div class="p-4">
          <h5>Orders for {{ slotProps.data.name }}</h5>
          <DataTable :value="slotProps.data.orders">
            <Column field="id" header="Id" sortable />
            <Column field="customer" header="Customer" sortable />
            <Column field="date" header="Date" sortable />
            <Column field="amount" header="Amount" sortable>
              <template #body="sp">{{
                formatCurrency(sp.data.amount)
              }}</template>
            </Column>
            <Column field="status" header="Status" sortable>
              <template #body="sp"
                ><Tag
                  :value="sp.data.status.toLowerCase()"
                  :severity="getOrderSeverity(sp.data)"
              /></template>
            </Column>
            <Column headerStyle="width:4rem">
              <template #body><Button icon="pi pi-search" /></template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}
:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
