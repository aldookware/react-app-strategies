import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AddModels.module.css';

const AddModels: React.FC = () => {
    const history = useHistory();
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files);
            setUploadedFiles(prev => [...prev, ...files]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setUploadedFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.addModelsContainer}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Add model(s)</h1>
                    <p className={styles.description}>
                        Upload your investment models for review and approval
                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <div className={styles.uploadSection}>
                <div className={styles.uploadCard}>
                    <h2>Upload your models</h2>
                    <p className={styles.uploadDescription}>
                        Upload your sheet here and let us handle the rest. For the best experience, download{' '}
                        <button 
                            type="button"
                            className={styles.templateLink}
                            onClick={() => {
                                // In a real app, this would download the template
                                alert('Model template download would start here');
                            }}
                            aria-label="Download model template"
                        >
                            our model template
                        </button>{' '}
                        to format your models, ensuring seamless mapping.
                    </p>
                    <p className={styles.disclaimer}>
                        <strong>Disclaimer:</strong> The validity of bulk models uploaded through this tool is dependent upon the accuracy of the data and information provided. 55ip is not responsible for any erroneous data uploaded. Please review and ensure data accuracy before continuing with the upload.
                    </p>

                    {/* Upload Area */}
                    <div 
                        className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''} ${uploadedFiles.length > 0 ? styles.hasFiles : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className={styles.uploadIcon}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 32L24 16M24 16L16 24M24 16L32 24" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 40H40" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <p className={styles.uploadText}>
                            Drag and drop files to upload, or click "select files."
                        </p>
                        <p className={styles.fileTypes}>
                            .csv, .xlsx, .pdf, no more than 10MB
                        </p>
                        <input
                            type="file"
                            id="fileInput"
                            className={styles.fileInput}
                            onChange={handleFileInput}
                            multiple
                            accept=".csv,.xlsx,.pdf"
                            aria-label="Select files to upload"
                        />
                        <button 
                            type="button"
                            className={styles.selectButton}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            SELECT FILES TO UPLOAD
                        </button>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                        <div className={styles.uploadedFiles}>
                            <h3>Uploaded Files:</h3>
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <span className={styles.fileName}>{file.name}</span>
                                    <span className={styles.fileSize}>
                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                    <button 
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => removeFile(index)}
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className={styles.actionButtons}>
                        <button 
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            className={styles.uploadButton}
                            disabled={uploadedFiles.length === 0}
                        >
                            Upload Models
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModels;
