-- Use the Clever Cloud database (already created)
USE bvmciujguontnhoih1pm;

-- Products table
CREATE TABLE IF NOT EXISTS Products (
    product_id      INT AUTO_INCREMENT PRIMARY KEY,
    product_name    VARCHAR(100) NOT NULL,
    product_desc    TEXT,
    status          ENUM('Draft', 'Published', 'Archived') DEFAULT 'Draft',
    -- Audit Columns
    created_by      VARCHAR(50) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by      VARCHAR(50),
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted      BOOLEAN DEFAULT FALSE
);

-- Helpful indexes for filtering/search
CREATE INDEX idx_products_status ON Products (status);
CREATE INDEX idx_products_is_deleted ON Products (is_deleted);
CREATE INDEX idx_products_name ON Products (product_name);

-- Sample rows
INSERT INTO Products (product_name, product_desc, created_by, status)
VALUES ('Product A', 'Description for Product A', 'admin', 'Draft')
ON DUPLICATE KEY UPDATE product_name = product_name;

INSERT INTO Products (product_name, product_desc, created_by, status)
VALUES ('Product B', 'Description for Product B', 'admin', 'Published')
ON DUPLICATE KEY UPDATE product_name = product_name;
