# Machine Learning Interview Basics

## Types of Machine Learning

### Supervised Learning
Model learns from labeled data (input-output pairs).

```
Training Data: [(feature1, feature2, ...) → label]

Types:
1. Classification: Predict discrete class
   - Logistic Regression
   - Decision Trees
   - Random Forest
   - SVM
   - Neural Networks

2. Regression: Predict continuous value
   - Linear Regression
   - Polynomial Regression
   - SVR (Support Vector Regression)
```

### Unsupervised Learning
Model finds patterns in unlabeled data.

```
Clustering: Group similar data points
   - K-Means
   - Hierarchical Clustering
   - DBSCAN

Dimensionality Reduction:
   - PCA (Principal Component Analysis)
   - t-SNE
```

### Reinforcement Learning
Agent learns by interacting with environment, receiving rewards/penalties.

```
Example: Game playing, Robotics
```

## Key Concepts

### Training, Validation, and Testing

```
Dataset
├── Training Set (60-70%): Train model
├── Validation Set (15-20%): Tune hyperparameters
└── Test Set (15-20%): Evaluate final performance

Never mix validation/test with training!
```

### Overfitting vs Underfitting

```
Underfitting: Model too simple, high bias, high error on both training and test

Just Right: Good fit, low bias, low variance

Overfitting: Model too complex, high variance, low training error, high test error
```

### Bias-Variance Trade-off

```
Total Error = Bias² + Variance + Irreducible Error

Bias: Error from assumptions (underfitting)
Variance: Error from sensitivity to training data (overfitting)
Irreducible Error: Noise in data
```

## Model Evaluation Metrics

### Classification Metrics

```
Confusion Matrix:
              Predicted
             Positive  Negative
Actual Pos    TP       FN
       Neg    FP       TN

Accuracy = (TP + TN) / (TP + TN + FP + FN)
    - Overall correctness
    - Bad for imbalanced data

Precision = TP / (TP + FP)
    - Of predicted positives, how many are correct?
    - Important when FP is costly

Recall = TP / (TP + FN)
    - Of actual positives, how many did we catch?
    - Important when FN is costly

F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
    - Harmonic mean of precision and recall
    - Good for imbalanced data

ROC-AUC
    - Plots True Positive Rate vs False Positive Rate
    - AUC = probability model ranks random positive higher than negative
    - 0.5 = random classifier, 1.0 = perfect
```

### Regression Metrics

```
Mean Absolute Error (MAE) = (1/n) * Σ|y_true - y_pred|
    - Average absolute difference
    - Less sensitive to outliers

Mean Squared Error (MSE) = (1/n) * Σ(y_true - y_pred)²
    - Average squared difference
    - Sensitive to outliers

Root Mean Squared Error (RMSE) = √MSE
    - Same units as target variable

R² Score = 1 - (SS_res / SS_tot)
    - 0 to 1 scale
    - 1 = perfect fit, 0 = model is as good as mean
```

## Handling Imbalanced Data

Problem: One class has much more data than others

```
Solutions:
1. Oversampling: Duplicate minority class
2. Undersampling: Remove majority class samples
3. SMOTE: Synthetically create minority samples
4. Weighted Loss: Give more weight to minority class
5. Different threshold: Adjust decision boundary
6. Use different metrics: Use F1, not accuracy
```

## Feature Engineering

```
Techniques:
1. Scaling/Normalization
   - StandardScaler: (x - mean) / std
   - MinMaxScaler: (x - min) / (max - min)
   
2. Encoding Categorical Variables
   - One-Hot Encoding: Create binary columns
   - Label Encoding: Map to integers
   - Target Encoding: Map to target mean
   
3. Feature Creation
   - Combinations of existing features
   - Domain knowledge based features
   
4. Feature Selection
   - Correlation analysis
   - Mutual information
   - Recursive feature elimination
   
5. Dimensionality Reduction
   - PCA: Reduce to top principal components
   - Feature selection: Remove less important features
```

## Model Selection

```
Simple Models:
- Linear Regression
- Logistic Regression
- Decision Trees
Pros: Fast, interpretable
Cons: May underfit

Complex Models:
- Random Forest
- Gradient Boosting
- Neural Networks
Pros: Can capture complex patterns
Cons: Slower, less interpretable, may overfit
```

### Hyperparameter Tuning

```
Grid Search: Try all combinations
GridSearchCV(estimator, param_grid, cv=5)

Random Search: Try random combinations
RandomizedSearchCV(estimator, param_dist, n_iter=10, cv=5)

Bayesian Optimization: Probabilistic approach
```

## Cross-Validation

```
K-Fold Cross-Validation:
1. Split data into k folds
2. Train k models, each holding out 1 fold
3. Average performance across folds

Benefits:
- Better use of data
- More reliable evaluation
- Reduces variance in performance estimate

Common: 5-fold or 10-fold
```

## Regularization Techniques

```
L1 Regularization (Lasso):
Loss = Original_Loss + λ * Σ|weight|
Effect: Some weights become exactly 0 (feature selection)

L2 Regularization (Ridge):
Loss = Original_Loss + λ * Σ(weight)²
Effect: Weights are small but rarely 0

Elastic Net: Combination of L1 and L2

Dropout (Neural Networks):
- Randomly drop neurons during training
- Prevents co-adaptation
- Reduces overfitting
```

## Neural Networks

```
Basic Architecture:
Input Layer → Hidden Layers → Output Layer

Activation Functions:
- ReLU: max(0, x) - Most common for hidden layers
- Sigmoid: 1/(1+e^-x) - Binary classification output
- Softmax: Exponential normalization - Multi-class output
- Tanh: Similar to sigmoid but -1 to 1 range

Optimization:
- SGD: Stochastic Gradient Descent
- Adam: Adaptive learning rate
- RMSprop: Root mean square propagation

Loss Functions:
- MSE: Regression
- Cross-Entropy: Classification
- Huber: Robust to outliers
```

## Common Interview Questions

1. **What is the difference between bias and variance?**
   - See Bias-Variance Trade-off section

2. **How would you handle imbalanced data?**
   - See Handling Imbalanced Data section

3. **Explain overfitting and how to prevent it**
   - High variance, low training error, high test error
   - Prevention: regularization, early stopping, cross-validation

4. **What's the difference between precision and recall?**
   - Precision: False positive cost, Recall: False negative cost

5. **How do you evaluate a regression model?**
   - Use RMSE, MAE, R² score

6. **Explain cross-validation**
   - See Cross-Validation section

7. **When would you use Random Forest over Decision Tree?**
   - Random Forest is ensemble, reduces overfitting, better performance

8. **What is feature scaling and why is it important?**
   - Normalize features to same scale
   - Important for distance-based models (KNN, K-Means, SVM)

9. **How do you select features?**
   - Correlation analysis, mutual information, domain knowledge

10. **Design a recommendation system**
    - Collaborative filtering, content-based, or hybrid
    - Handle cold start problem
    - Evaluate with precision@k, recall@k

## Dataset Problem Example

**Binary Classification Problem:**
```
Dataset: 1000 samples, 95% class 0, 5% class 1

Problem: Accuracy is misleading (can get 95% by predicting all 0s)

Solution:
- Use F1 score, not accuracy
- Oversample or SMOTE minority class
- Use class weights
- Use stratified cross-validation
```
