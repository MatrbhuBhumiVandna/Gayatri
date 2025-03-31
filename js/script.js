document.addEventListener('DOMContentLoaded', function() {
    // Measurement fields for each garment type
    const measurementFields = {
        shirt: [
            'Neck', 'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve Length',
            'Bicep', 'Cuff', 'Shirt Length', 'Front Style'
        ],
        pant: [
            'Waist', 'Hip', 'Thigh', 'Knee', 'Bottom', 'Length',
            'Front Rise', 'Back Rise', 'Pocket Style', 'Bottom Style'
        ],
        blazer: [
            'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve Length',
            'Bicep', 'Cuff', 'Length', 'Vent Style', 'Lapel Style'
        ],
        sherwani: [
            'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve Length',
            'Length', 'Neck', 'Front Style', 'Back Style', 'Bottom Style'
        ]
    };

    // Current customer ID
    let currentCustomerId = null;
    let editMode = false;

    // Initialize the measurement forms
    function initializeMeasurementForms() {
        for (const [garmentType, fields] of Object.entries(measurementFields)) {
            const form = document.getElementById(`${garmentType}Form`);
            form.innerHTML = '';
            
            fields.forEach((field, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 mb-3';
                
                const label = document.createElement('label');
                label.className = 'form-label';
                label.textContent = field;
                
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control measurement-input';
                input.dataset.garment = garmentType;
                input.dataset.measurement = field.toLowerCase().replace(' ', '_');
                input.disabled = !editMode;
                
                col.appendChild(label);
                col.appendChild(input);
                form.appendChild(col);
            });
        }
    }

    // Load customers list
    function loadCustomers(searchTerm = '') {
        // For demo purposes - in real app, this would fetch from server
        const demoCustomers = [
            { customer_id: 1, name: "Rahul Sharma", mobile: "9876543210" },
            { customer_id: 2, name: "Priya Patel", mobile: "8765432109" },
            { customer_id: 3, name: "Amit Singh", mobile: "7654321098" }
        ];
        
        const filteredCustomers = demoCustomers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            customer.mobile.includes(searchTerm)
        );
        
        const customerList = document.getElementById('customerList');
        customerList.innerHTML = '';
        
        filteredCustomers.forEach(customer => {
            const li = document.createElement('li');
            li.className = 'list-group-item customer-item';
            li.dataset.customerId = customer.customer_id;
            li.innerHTML = `
                <h5>${customer.name}</h5>
                <p>${customer.mobile}</p>
            `;
            li.addEventListener('click', () => loadCustomerDetails(customer.customer_id));
            customerList.appendChild(li);
        });
    }

    // Load customer details (demo version)
    function loadCustomerDetails(customerId) {
        currentCustomerId = customerId;
        editMode = false;
        
        // Demo customer data
        const demoCustomerData = {
            1: { name: "Rahul Sharma", mobile: "9876543210" },
            2: { name: "Priya Patel", mobile: "8765432109" },
            3: { name: "Amit Singh", mobile: "7654321098" }
        };
        
        const customer = demoCustomerData[customerId];
        document.getElementById('customerNameNav').textContent = customer.name;
        document.getElementById('customerMobileNav').textContent = customer.mobile;
        
        // Enable save button if in edit mode
        document.getElementById('saveBtn').disabled = !editMode;
        
        // Reset all inputs
        document.querySelectorAll('.measurement-input').forEach(input => {
            input.value = '';
        });
    }

    // Add new customer
    document.getElementById('addNewCustomerBtn').addEventListener('click', function() {
        editMode = true;
        currentCustomerId = null;
        
        // Reset customer info in navbar
        document.getElementById('customerNameNav').textContent = 'New Customer';
        document.getElementById('customerMobileNav').textContent = '';
        
        // Enable all measurement inputs
        document.querySelectorAll('.measurement-input').forEach(input => {
            input.value = '';
            input.disabled = false;
        });
        
        // Enable save button
        document.getElementById('saveBtn').disabled = false;
        
        // Prompt for customer name and mobile
        const name = prompt('Enter customer name:');
        const mobile = prompt('Enter customer mobile number:');
        
        if (name && mobile) {
            document.getElementById('customerNameNav').textContent = name;
            document.getElementById('customerMobileNav').textContent = mobile;
        } else {
            alert('Customer name and mobile number are required!');
            editMode = false;
            document.getElementById('saveBtn').disabled = true;
            document.querySelectorAll('.measurement-input').forEach(input => {
                input.disabled = true;
            });
        }
    });

    // Save measurements (demo version)
    document.getElementById('saveBtn').addEventListener('click', function() {
        if (!editMode) return;
        
        const name = document.getElementById('customerNameNav').textContent;
        const mobile = document.getElementById('customerMobileNav').textContent;
        
        if (!name || !mobile || name === 'Select a customer' || name === 'New Customer') {
            alert('Please enter valid customer name and mobile number first!');
            return;
        }
        
        alert('In a real application, this would save to database.\n\nCustomer: ' + name + '\nMobile: ' + mobile);
        
        // For demo purposes, just exit edit mode
        editMode = false;
        document.getElementById('saveBtn').disabled = true;
        document.querySelectorAll('.measurement-input').forEach(input => {
            input.disabled = true;
        });
        
        // Add to customer list if new customer
        if (!currentCustomerId) {
            loadCustomers();
        }
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        loadCustomers(this.value);
    });

    // Initialize the app
    initializeMeasurementForms();
    loadCustomers();
});
