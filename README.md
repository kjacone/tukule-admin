# Tukule Restaurant Management System - Admin Guide

## Overview

The **Restaurant Management System (RMS)** serves as a comprehensive platform for managing inventory and orders. This admin-focused system streamlines restaurant operations through real-time inventory tracking, order processing, and reporting capabilities.

## Core Modules

### Inventory Management 

* **Stock Tracking**: Real-time monitoring of ingredient levels and kitchen supplies
* **Vendor Management**: Centralized database of suppliers with contact details and order history
* **Automated Alerts**: Notifications for low stock items and reorder points
* **Batch Tracking**: Monitor expiration dates and ingredient freshness
* **Cost Analysis**: Track price fluctuations and calculate food costs

### Order Processing

* **POS Integration**: Seamless connection with front-end ordering systems
* **Kitchen Display System**: Real-time order queue management
* **Order Modification**: Handle special requests and modifications
* **Table Management**: Track table status and order assignments
* **Digital Receipt Generation**: Automated billing and receipt creation

### Reporting & Analytics

* **Sales Reports**: Daily, weekly, and monthly revenue analysis
* **Inventory Reports**: Usage patterns and waste tracking
* **Popular Items**: Track best-selling dishes and seasonal trends
* **Cost Reports**: Calculate food costs and profit margins
* **Staff Performance**: Monitor order processing times and efficiency

## Administrative Features

### User Management

* **Role-based Access**: Customize permissions for different staff levels
* **Activity Logging**: Track user actions for security and accountability
* **Shift Management**: Monitor staff schedules and performance
* **Training Mode**: Safe environment for new staff training

### System Configuration

* **Menu Management**: Update prices, items, and specials
* **Tax Settings**: Configure tax rates and special charges
* **Payment Options**: Manage accepted payment methods
* **Printer Setup**: Configure receipt and kitchen printers
* **Backup Settings**: Automated data backup configuration

## Implementation Guide

### Initial Setup

* Configure system parameters
* Set up user roles and permissions
* Import initial inventory data
* Configure vendor information
* Set up printer and POS connections

### Daily Operations

* **Morning Checklist**:
 * Review overnight reports
 * Check inventory levels
 * Verify vendor deliveries
 * Update daily specials

* **Evening Procedures**:
 * Generate daily reports
 * Review inventory usage
 * Process vendor payments
 * Backup system data

### Inventory Procedures

* **Stock Updates**:
 * Record new deliveries
 * Update stock levels
 * Check expiration dates
 * Document waste and losses

* **Vendor Management**:
 * Process purchase orders
 * Track delivery schedules
 * Manage supplier contracts
 * Review pricing agreements

## Troubleshooting

### Common Issues

* **Stock Discrepancies**: Regular audit procedures
* **Order Sync Issues**: POS system reconciliation steps
* **Printer Problems**: Connection and driver checks
* **User Access Issues**: Permission verification process

### System Maintenance

* **Regular Updates**: Schedule system updates during off-peak hours
* **Data Backup**: Automated daily backup procedures
* **Performance Optimization**: Regular database maintenance
* **Security Checks**: Periodic security audit protocols

## Best Practices

* Conduct daily inventory checks
* Regularly update vendor information
* Monitor staff system usage
* Keep detailed maintenance logs
* Schedule regular staff training
* Maintain backup procedures
* Review security protocols monthly
* Update menu items promptly

## Cloning the Repository

To clone the repository, use the following command: 
```bash
git clone https://github.com/kjacone/tukule-admin.git 
```
## Installing Dependencies

Navigate to the project directory and run the following command to install the dependencies: 
```bash
npm install
```
## Running the Application

To run the application, use the following command:
```bash 
ng serve 
```
This will start the development server and you can access the application at `http://localhost:4200`.

## Additional Information

For more information about the project, you can refer to the [project documentation](docs/README.md).
